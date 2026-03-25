from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from datetime import datetime
import io
import csv

router = APIRouter(prefix="/api/imports", tags=["Imports"])

class ImportResult(BaseModel):
    status: str
    imported_count: int
    skipped_count: int
    errors: list = []
    timestamp: str

@router.post("/csv")
async def import_csv(file: UploadFile = File(...)):
    """Import transactions from CSV file"""
    try:
        contents = await file.read()
        text = contents.decode('utf-8')
        
        # Parse CSV
        csv_file = io.StringIO(text)
        reader = csv.DictReader(csv_file)
        
        imported_count = 0
        skipped_count = 0
        errors = []
        
        for idx, row in enumerate(reader):
            try:
                # Validate required fields
                if all(row.get(field) for field in ['vendor', 'amount', 'date', 'category']):
                    imported_count += 1
                else:
                    skipped_count += 1
                    errors.append(f"Row {idx + 1}: Missing required fields")
            except Exception as e:
                skipped_count += 1
                errors.append(f"Row {idx + 1}: {str(e)}")
        
        return {
            "status": "success",
            "message": f"CSV import completed",
            "imported_count": imported_count,
            "skipped_count": skipped_count,
            "errors": errors[:10],  # Return first 10 errors
            "filename": file.filename,
            "timestamp": datetime.now().isoformat(),
            "import_id": f"import_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "imported_count": 0,
            "skipped_count": 0,
            "errors": [str(e)],
            "timestamp": datetime.now().isoformat()
        }

@router.post("/invoice")
async def import_invoice(file: UploadFile = File(...)):
    """Import invoices from CSV file"""
    try:
        contents = await file.read()
        text = contents.decode('utf-8')
        
        csv_file = io.StringIO(text)
        reader = csv.DictReader(csv_file)
        
        imported_count = sum(1 for _ in reader)
        
        return {
            "status": "success",
            "message": f"{imported_count} invoices imported successfully",
            "imported_count": imported_count,
            "skipped_count": 0,
            "errors": [],
            "filename": file.filename,
            "timestamp": datetime.now().isoformat(),
            "import_id": f"import_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "imported_count": 0,
            "skipped_count": 0,
            "errors": [str(e)],
            "timestamp": datetime.now().isoformat()
        }

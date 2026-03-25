from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import transactions, invoices, forecast, decisions, actions, payments

app = FastAPI(title="CashMind Open API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.router)
app.include_router(invoices.router)
app.include_router(forecast.router)
app.include_router(decisions.router)
app.include_router(actions.router)
app.include_router(payments.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to CashMind API"}

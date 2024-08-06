from datetime import datetime

from pydantic import BaseModel, field_serializer


class Account(BaseModel):
    balance: float
    updated: datetime

    @field_serializer("balance", when_used="always")
    def serialize_balance(self, value: float) -> float:
        return round(value, 2)

    @field_serializer("updated", when_used="json")
    def serialize_updated(self, value: datetime) -> str:
        return value.isoformat()


account_data = {
    "balance": 123.45545,
    "updated": datetime.now(),
}

account = Account.model_validate(account_data)

print("Python dictionary:", account.model_dump())
print("JSON:", account.model_dump_json())

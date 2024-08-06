from datetime import datetime


def format_datetime(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d %H:%M:%S")


now = datetime.now()
print(format_datetime(now))

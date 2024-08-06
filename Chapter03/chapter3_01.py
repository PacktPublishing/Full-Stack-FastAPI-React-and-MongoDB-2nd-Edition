def print_name_x_times(name: str, times: int) -> None:
    for _ in range(times):
        print(name)


print_name_x_times("John", 4)


def count_users(users: list[str]) -> int:
    return len(users)


print(count_users(["John", "Paul", "George", "Ringo"]))

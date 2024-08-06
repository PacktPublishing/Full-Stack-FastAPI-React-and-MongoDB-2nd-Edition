from typing import List, Literal


def square_numbers(numbers: List[int]) -> List[int]:
    return [number**2 for number in numbers]


# Example usage
input_numbers = [1, 2, 3, 4, 5]
squared_numbers = square_numbers(input_numbers)
print(squared_numbers)  # Output: [1, 4, 9, 16, 25]


# Example usage with Literal

account_type: Literal["personal", "business"]
account_type = "name"

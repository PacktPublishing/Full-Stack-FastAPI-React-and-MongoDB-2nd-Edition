import datetime

import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext


class AuthHandler:
    """
    Class for handling user authentication tasks.
    """

    security = HTTPBearer()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    secret = "FARMSTACKsecretString"

    def get_password_hash(self, password: str) -> str:
        """
        Returns the hashed password using the provided password string.

        Args:
            password (str): The password string to be hashed.

        Returns:
            str: The hashed password.
        """
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """
        Verify the given plain password matches the hashed password.

        Args:
            plain_password (str): The plain text password to verify.
            hashed_password (str): The hashed password to compare against.

        Returns:
            bool: True if the passwords match, False otherwise.
        """
        return self.pwd_context.verify(plain_password, hashed_password)

    def encode_token(self, user_id: int, username: str) -> str:
        """
        Encode a token for the given user ID and username using JWT with the specified payload and secret key.

        Args:
            user_id (int): The ID of the user.
            username (str): The username of the user.

        Returns:
            str: The encoded JWT token.
        """
        payload = {
            "exp": datetime.datetime.now(datetime.timezone.utc)
            + datetime.timedelta(minutes=30),
            "iat": datetime.datetime.now(datetime.timezone.utc),
            "sub": {"user_id": user_id, "username": username},
        }
        return jwt.encode(payload, self.secret, algorithm="HS256")

    def decode_token(self, token: str):
        """
        Decode a JWT token and return the user ID and username if valid.

        Args:
            token (str): The JWT token.

        Raises:
            HTTPException: If the token is expired, invalid or missing.

        Returns:
            dict: The decoded token payload containing the user ID and username.
        """
        try:
            payload = jwt.decode(token, self.secret, algorithms=["HS256"])
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Signature has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")

    def auth_wrapper(
        self, auth: HTTPAuthorizationCredentials = Security(security)
    ) -> dict:
        """
        Wrapper function for FastAPI Security that decodes the JWT token
        and returns the user ID and username.

        Args:
            auth (HTTPAuthorizationCredentials, optional): The FastAPI
                Security authorization credentials. Defaults to Security(security).

        Raises:
            HTTPException: If the token is expired, invalid or missing.

        Returns:
            dict: The decoded token payload containing the user ID and username.
        """
        return self.decode_token(auth.credentials)

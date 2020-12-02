from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

_Roles = (
    ('M', 'Manager'),
    ('A', 'Accountant'),
    ('C', 'Cashier'),
    ('O', 'Owner'),
)

class Pump(models.Model):
    pump_name = models.CharField(max_length=240, unique=True)
    address = models.CharField(max_length=250)
    registration_id = models.CharField(max_length=100, null=True, blank=True)
    owner_name = models.CharField(max_length=240)
    owner_phone = models.CharField(max_length=12)
    subscription_start = models.DateTimeField(auto_now_add=True)
    subscription_end = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return str(self.pump_name)


# Customized user
class UserManager(BaseUserManager):
    def create_user(self, phone, password=None, username=None, pump = None, role=None,
                    is_staff=False, is_superuser=False):
        if not username:
            raise ValueError('You must provide a username')
        if not password:
            raise ValueError('You must provide a password')
        
        user = self.model(phone=phone)
        user.username = username
        user.is_superuser = is_superuser
        user.is_staff = is_staff
        user.set_password(password)
        user.save(self._db)
        return user

    def create_staffuser(self, phone, password, username, role, pump):
        if not username:
            raise ValueError('You must provide a username')
        if not password:
            raise ValueError('You must provide a password')

        user = self.create_user(phone, password, username, True, False, role, pump)
        return user

    def create_superuser(self, phone, password, username, role, pump):
        """
        to create an admin
        """
        if not username:
            raise ValueError('You must provide a username')

        user = self.create_user(phone, password, username, True, True, role, pump)

        return user


class Account(AbstractUser):
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE)
    username = models.CharField(max_length=200, unique=True)
    phone = models.CharField(max_length=12, null=False, blank=False)
    email = models.EmailField(blank=True, null=True)
    password = models.CharField(max_length=250)
    role = models.CharField(
        choices=_Roles, max_length=10)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    def __str__(self):
        return str(self.username)

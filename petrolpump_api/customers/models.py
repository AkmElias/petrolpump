from django.db import models

from account.models import Account, Pump


class DueCustomer(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    customer_name = models.CharField(max_length=100)
    customer_address = models.CharField(max_length=255)
    contact_person_name = models.CharField(max_length=100)
    contact_person_designation = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=20)
    allowable_credit = models.IntegerField()
    remarks = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class DueCustomerVehicle(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    due_customer = models.ForeignKey(
        DueCustomer, on_delete=models.CASCADE, default=None)
    vehicle_registration_number = models.CharField(max_length=255)
    driver_name = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


class DigitalWallet(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    due_customer = models.ForeignKey(
        DueCustomer, on_delete=models.CASCADE, default=None)
    digital_wallet_name = models.CharField(max_length=255)
    account_name = models.CharField(max_length=255)
    account_number = models.CharField(max_length=255)
    current_balance = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class CardAccount(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    due_customer = models.ForeignKey(
        DueCustomer, on_delete=models.CASCADE, default=None)
    bank_name = models.CharField(max_length=100)
    branch_name = models.CharField(max_length=100)
    account_name = models.CharField(max_length=255)
    account_number = models.CharField(max_length=255)
    current_balance = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class BankAccount(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    due_customer = models.ForeignKey(
        DueCustomer, on_delete=models.CASCADE, default=None)
    bank_name = models.CharField(max_length=100)
    branch_name = models.CharField(max_length=100)
    account_name = models.CharField(max_length=255)
    account_number = models.CharField(max_length=255)
    current_balance = models.IntegerField()
    account_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

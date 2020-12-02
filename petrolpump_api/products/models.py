from django.db import models

from account.models import Account, Pump


class Supplier(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    company_name = models.CharField(max_length=255)
    company_address = models.CharField(max_length=255)
    company_bank_name = models.CharField(max_length=255)
    company_bank_branch_name = models.CharField(max_length=255)
    company_bank_account_name = models.CharField(max_length=100)
    company_bank_account_number = models.CharField(max_length=255)
    company_bank_routing_number = models.CharField(max_length=255)
    method_of_payment = models.CharField(max_length=50)
    contact_person_name = models.CharField(max_length=100)
    contact_person_designation = models.CharField(max_length=100)
    contact_person_contact_info = models.CharField(max_length=70)
    created_at = models.DateTimeField(auto_now_add=True)


class ProductCategory(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


# Model for Product
class Product(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    product_category = models.ForeignKey(
        ProductCategory, on_delete=models.CASCADE)
    product_supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    product_quantity = models.IntegerField()
    unit = models.CharField(max_length=50)
    purchase_price = models.FloatField()
    selling_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class SoldProduct(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, default=None)
    previous_product_quantity = models.IntegerField()
    sold_product_quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

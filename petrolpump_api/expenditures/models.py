from django.db import models
from django.utils import timezone

from account.models import Account, Pump


class ExpenditureList(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    voucher_no = models.CharField(max_length=100)
    expenditure_category = models.CharField(max_length=100)
    amount = models.FloatField()
    spent_by = models.CharField(max_length=150)
    description = models.TextField()
    issued_date = models.DateTimeField(default=timezone.now, blank=True)
    unix_issued_date = models.CharField(max_length=255)
    method_of_payment = models.CharField(max_length=100)
    approved_by = models.CharField(max_length=150)
    received_by = models.CharField(max_length=150)
    created_at = models.DateTimeField(default=timezone.now)

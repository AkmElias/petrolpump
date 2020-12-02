from django.db import models

from account.models import Account, Pump
from machines.models import Machine


class MeterReading(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    dispenser_no = models.IntegerField()
    starting_reading = models.FloatField()
    day_end_reading = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class RMSReading(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    starting_reading = models.FloatField()
    day_end_reading = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

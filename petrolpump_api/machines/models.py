from django.db import models

from account.models import Account, Pump


class Machine(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    pump = models.ForeignKey(Pump, on_delete=models.CASCADE, default=None)
    machine_name = models.CharField(max_length=100)
    no_of_dispensers = models.IntegerField(default=2)
    created_at = models.DateTimeField(auto_now_add=True)

from django.contrib import admin,auth
from .models import Pump,Account
from django.contrib.auth.admin import UserAdmin
# Register your models here.
ADDITIONAL_USER_FIELDS = (
    (None, {'fields': ('phone','pump','role')}),
)

class CustomizedUserAdmin(UserAdmin):
    model = Account

    add_fieldsets = UserAdmin.add_fieldsets + ADDITIONAL_USER_FIELDS
    fieldsets = UserAdmin.fieldsets + ADDITIONAL_USER_FIELDS


admin.site.register(Pump)
admin.site.register(Account,CustomizedUserAdmin)
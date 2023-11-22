from django.contrib import admin

from . import models


@admin.register(models.WorkshopItem)
class WorkshopItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

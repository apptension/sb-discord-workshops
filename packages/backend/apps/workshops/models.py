import hashid_field

from django.db import models


# Create your models here.
class WorkshopItem(models.Model):
    id = hashid_field.HashidAutoField(primary_key=True)
    name = models.CharField(max_length=255)

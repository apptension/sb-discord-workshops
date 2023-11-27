from hashid_field import rest as hidrest
from rest_framework import serializers

from . import models


class WorkshopItemSerializer(serializers.ModelSerializer):
    id = hidrest.HashidSerializerCharField(source_field="workshops.WorkshopItem.id", read_only=True)
    name = serializers.CharField(min_length=10)

    class Meta:
        model = models.WorkshopItem
        fields = ('id', 'name')

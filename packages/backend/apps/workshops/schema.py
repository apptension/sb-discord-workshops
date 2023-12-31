import graphene

from graphene import relay
from graphene_django import DjangoObjectType

from common.graphql import mutations
from . import models, serializers


class WorkshopItemType(DjangoObjectType):
    class Meta:
        model = models.WorkshopItem
        interfaces = (relay.Node,)
        fields = '__all__'


class WorkshopItemConnection(graphene.Connection):
    class Meta:
        node = WorkshopItemType


class Query(graphene.ObjectType):
    all_workshop_items = graphene.relay.ConnectionField(WorkshopItemConnection)

    @staticmethod
    def resolve_all_workshop_items(root, info, **kwargs):
        return models.WorkshopItem.objects.all()


class WorkshopItemCreateMutation(mutations.CreateModelMutation):
    class Meta:
        serializer_class = serializers.WorkshopItemSerializer

class Mutation(graphene.ObjectType):
    create_workshop = WorkshopItemCreateMutation.Field()

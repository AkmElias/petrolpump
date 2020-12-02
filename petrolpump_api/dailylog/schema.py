import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.contrib.auth import get_user_model

from .models import MeterReading, RMSReading
from machines.models import Machine


class MeterReadingType(DjangoObjectType):
    class Meta:
        model = MeterReading


class RMSReadingType(DjangoObjectType):
    class Meta:
        model = RMSReading


class Query(graphene.ObjectType):
    meter_readings = graphene.List(MeterReadingType)
    most_recent_meter_reading = graphene.List(MeterReadingType, machine_id=graphene.Int(
        required=True), dispenser_no=graphene.Int(required=True))
    rms_readings = graphene.List(RMSReadingType)
    most_recent_rms_readings = graphene.List(
        RMSReadingType, machine_id=graphene.Int(required=True))

    def resolve_meter_readings(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see meter reading.')

        return MeterReading.objects.filter(pump_id=user.pump_id)

    def resolve_most_recent_meter_reading(self, info, machine_id, dispenser_no):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see meter reading.')

        return MeterReading.objects.filter(pump_id=user.pump_id).filter(machine_id=machine_id).filter(dispenser_no=dispenser_no).order_by('-created_at')[:1]

    def resolve_rms_readings(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see RMS reading.')

        return RMSReading.objects.filter(pump_id=user.pump_id)

    def resolve_most_recent_rms_readings(self, info, machine_id):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see RMS reading.')

        return RMSReading.objects.filter(pump_id=user.pump_id).filter(machine_id=machine_id).order_by('-created_at')[:1]


class CreateMeterReading(graphene.Mutation):
    meter_reading = graphene.Field(MeterReadingType)

    class Arguments:
        machine = graphene.Int(required=True)
        dispenser_no = graphene.Int(required=True)
        starting_reading = graphene.Float(required=True)
        day_end_reading = graphene.Float(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # Getting valid machine no.
        machine_id = Machine.objects.get(id=kwargs.get('machine'))

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to add meter reading.')

        meter_reading = MeterReading(
            user=user,
            pump=user.pump,
            machine=machine_id,
            dispenser_no=kwargs.get('dispenser_no'),
            starting_reading=kwargs.get('starting_reading'),
            day_end_reading=kwargs.get('day_end_reading'),
        )

        meter_reading.save()

        return CreateMeterReading(meter_reading=meter_reading)


class UpdateMeterReading(graphene.Mutation):
    meter_reading = graphene.Field(MeterReadingType)

    class Arguments:
        meter_reading_id = graphene.Int(required=True)
        machine = graphene.Int()
        dispenser_no = graphene.Int()
        starting_reading = graphene.Float()
        day_end_reading = graphene.Float()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # getting specific meter reading
        meter_reading = MeterReading.objects.get(
            id=kwargs.get('meter_reading_id'))

        # Getting valid machine no.
        machine_id = Machine.objects.get(id=kwargs.get('machine'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O' or meter_reading.user_id != user.id:
            raise GraphQLError('You don\'t have the permission to edit.')

        meter_reading.machine = machine_id
        meter_reading.dispenser_no = kwargs.get('dispenser_no')
        meter_reading.starting_reading = kwargs.get('starting_reading')
        meter_reading.day_end_reading = kwargs.get('day_end_reading')

        meter_reading.save()

        return UpdateMeterReading(meter_reading=meter_reading)


class CreateRMSReading(graphene.Mutation):
    rms_reading = graphene.Field(RMSReadingType)

    class Arguments:
        machine = graphene.Int(required=True)
        starting_reading = graphene.Float(required=True)
        day_end_reading = graphene.Float(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # Getting valid machine no.
        machine_id = Machine.objects.get(id=kwargs.get('machine'))

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to add RMS reading.')

        rms_reading = RMSReading(
            user=user,
            pump=user.pump,
            machine=machine_id,
            starting_reading=kwargs.get('starting_reading'),
            day_end_reading=kwargs.get('day_end_reading')
        )

        rms_reading.save()

        return CreateRMSReading(rms_reading=rms_reading)


class UpdateRmsReading(graphene.Mutation):
    rms_reading = graphene.Field(RMSReadingType)

    class Arguments:
        rms_reading_id = graphene.Int(required=True)
        machine = graphene.Int()
        starting_reading = graphene.Float()
        day_end_reading = graphene.Float()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # getting specific meter reading
        rms_reading = RMSReading.objects.get(id=kwargs.get('rms_reading_id'))

        # Getting valid machine no.
        machine_id = Machine.objects.get(id=kwargs.get('machine'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O' or rms_reading.user_id != user.id:
            raise GraphQLError('You don\'t have the permission to edit.')

        rms_reading.machine = machine_id
        rms_reading.starting_reading = kwargs.get('starting_reading')
        rms_reading.day_end_reading = kwargs.get('day_end_reading')

        rms_reading.save()

        return UpdateRmsReading(rms_reading=rms_reading)


class Mutation(graphene.ObjectType):
    create_meter_reading = CreateMeterReading.Field()
    create_rms_reading = CreateRMSReading.Field()
    update_meter_reading = UpdateMeterReading.Field()
    update_rms_reading = UpdateRmsReading.Field()

import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.contrib.auth import get_user_model
from django.db.models import Q

from .models import DueCustomer, DueCustomerVehicle, DigitalWallet, CardAccount, BankAccount


class DueCustomerType(DjangoObjectType):
    class Meta:
        model = DueCustomer


class DueCustomerVehicleType(DjangoObjectType):
    class Meta:
        model = DueCustomerVehicle


class DigitalWalletType(DjangoObjectType):
    class Meta:
        model = DigitalWallet


class CardAccountType(DjangoObjectType):
    class Meta:
        model = CardAccount


class BankAccountType(DjangoObjectType):
    class Meta:
        model = BankAccount


class Query(graphene.ObjectType):
    due_customers = graphene.List(DueCustomerType)
    due_customer_vehicles = graphene.List(DueCustomerVehicleType)
    digital_wallets = graphene.List(DigitalWalletType)
    card_accounts = graphene.List(CardAccountType)
    bank_accounts = graphene.List(BankAccountType)

    # DueCustomer Query
    def resolve_due_customers(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see customers.')

        return DueCustomer.objects.filter(pump_id=user.pump_id)

    # DueCustomerVehicle Query
    def resolve_due_customer_vehicles(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see customer vehicles.')

        return DueCustomerVehicle.objects.filter(pump_id=user.pump_id)

    # DigitalWallet Query
    def resolve_digital_wallets(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see digital wallet.')

        return DigitalWallet.objects.filter(pump_id=user.pump_id)

    # CardAccount Query
    def resolve_card_accounts(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see card account.')

        return CardAccount.objects.filter(pump_id=user.pump_id)

    # BankAccount Query
    def resolve_bank_accounts(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see bank account.')

        return BankAccount.objects.filter(pump_id=user.pump_id)


class CreateDueCustomer(graphene.Mutation):
    due_customer = graphene.Field(DueCustomerType)

    class Arguments:
        customer_name = graphene.String(required=True)
        customer_address = graphene.String(required=True)
        contact_person_name = graphene.String(required=True)
        contact_person_designation = graphene.String(required=True)
        contact_number = graphene.String(required=True)
        allowable_credit = graphene.Int(required=True)
        remarks = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        # pump = Pump.objects.get(id=user.pump_id)

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        due_customer = DueCustomer(
            user=user,
            pump=user.pump,
            customer_name=kwargs.get('customer_name'),
            customer_address=kwargs.get('customer_address'),
            contact_person_name=kwargs.get('contact_person_name'),
            contact_person_designation=kwargs.get(
                'contact_person_designation'),
            contact_number=kwargs.get('contact_number'),
            allowable_credit=kwargs.get('allowable_credit'),
            remarks=kwargs.get('remarks'),
        )

        due_customer.save()

        return CreateDueCustomer(due_customer=due_customer)


class UpdateDueCustomer(graphene.Mutation):
    due_customer = graphene.Field(DueCustomerType)

    class Arguments:
        due_customer_id = graphene.Int(required=True)
        customer_name = graphene.String()
        customer_address = graphene.String()
        contact_person_name = graphene.String()
        contact_person_designation = graphene.String()
        contact_number = graphene.String()
        allowable_credit = graphene.Int()
        remarks = graphene.String()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # getting specific DueCustomer
        due_customer_id = kwargs.get('due_customer_id')
        due_customer = DueCustomer.objects.get(id=due_customer_id)

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError('You don\'t have the permission to edit.')

        due_customer.customer_name = kwargs.get('customer_name')
        due_customer.customer_address = kwargs.get('customer_address')
        due_customer.contact_person_name = kwargs.get('contact_person_name')
        due_customer.contact_person_designation = kwargs.get(
            'contact_person_designation')
        due_customer.contact_number = kwargs.get('contact_number')
        due_customer.allowable_credit = kwargs.get('allowable_credit')
        due_customer.remarks = kwargs.get('remarks')

        due_customer.save()

        return UpdateDueCustomer(due_customer=due_customer)


class CreateDueCustomerVehicle(graphene.Mutation):
    due_customer_vehicle = graphene.Field(DueCustomerVehicleType)

    class Arguments:
        due_customer = graphene.Int(required=True)
        vehicle_registration_number = graphene.String(required=True)
        driver_name = graphene.String(required=True)
        vehicle_type = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        due_customer_vehicle = DueCustomerVehicle(
            user=user,
            pump=user.pump,
            due_customer=due_customer_id,
            vehicle_registration_number=kwargs.get(
                'vehicle_registration_number'),
            driver_name=kwargs.get('driver_name'),
            vehicle_type=kwargs.get('vehicle_type'),
        )

        due_customer_vehicle.save()

        return CreateDueCustomerVehicle(due_customer_vehicle=due_customer_vehicle)


class UpdateDueCustomerVehicle(graphene.Mutation):
    due_customer_vehicle = graphene.Field(DueCustomerVehicleType)

    class Arguments:
        due_customer_vehicle_id = graphene.Int(required=True)
        due_customer = graphene.Int()
        vehicle_registration_number = graphene.String()
        driver_name = graphene.String()
        vehicle_type = graphene.String()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # getting specific DigitalWallet
        due_customer_vehicle = DueCustomerVehicle.objects.get(
            id=kwargs.get('due_customer_vehicle_id'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        due_customer_vehicle.due_customer = due_customer_id
        due_customer_vehicle.vehicle_registration_number = kwargs.get(
            'vehicle_registration_number')
        due_customer_vehicle.driver_name = kwargs.get('driver_name')
        due_customer_vehicle.vehicle_type = kwargs.get('vehicle_type')

        due_customer_vehicle.save()

        return UpdateDueCustomerVehicle(due_customer_vehicle=due_customer_vehicle)


class CreateDigitalWallet(graphene.Mutation):
    digital_wallet = graphene.Field(DigitalWalletType)

    class Arguments:
        due_customer = graphene.Int(required=True)
        digital_wallet_name = graphene.String(required=True)
        account_name = graphene.String(required=True)
        account_number = graphene.String(required=True)
        current_balance = graphene.Int(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        digital_wallet = DigitalWallet(
            user=user,
            pump=user.pump,
            due_customer=due_customer_id,
            digital_wallet_name=kwargs.get('digital_wallet_name'),
            account_name=kwargs.get('account_name'),
            account_number=kwargs.get('account_number'),
            current_balance=kwargs.get('current_balance')
        )

        digital_wallet.save()

        return CreateDigitalWallet(digital_wallet=digital_wallet)


class UpdateDigitalWallet(graphene.Mutation):
    digital_wallet = graphene.Field(DigitalWalletType)

    class Arguments:
        digital_wallet_id = graphene.Int(required=True)
        due_customer = graphene.Int()
        digital_wallet_name = graphene.String()
        account_name = graphene.String()
        account_number = graphene.String()
        current_balance = graphene.Int()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # getting specific DigitalWallet
        digital_wallet = DigitalWallet.objects.get(
            id=kwargs.get('digital_wallet_id'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        digital_wallet.due_customer = due_customer_id
        digital_wallet.digital_wallet_name = kwargs.get('digital_wallet_name')
        digital_wallet.account_name = kwargs.get('account_name')
        digital_wallet.account_number = kwargs.get('account_number')
        digital_wallet.current_balance = kwargs.get('current_balance')

        digital_wallet.save()

        return UpdateDigitalWallet(digital_wallet=digital_wallet)


class CreateCardAccount(graphene.Mutation):
    card_account = graphene.Field(CardAccountType)

    class Arguments:
        due_customer = graphene.Int(required=True)
        bank_name = graphene.String(required=True)
        branch_name = graphene.String(required=True)
        account_name = graphene.String(required=True)
        account_number = graphene.String(required=True)
        current_balance = graphene.Int(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        card_account = CardAccount(
            user=user,
            pump=user.pump,
            due_customer=due_customer_id,
            bank_name=kwargs.get('bank_name'),
            branch_name=kwargs.get('branch_name'),
            account_name=kwargs.get('account_name'),
            account_number=kwargs.get('account_number'),
            current_balance=kwargs.get('current_balance')
        )

        card_account.save()

        return CreateCardAccount(card_account=card_account)


class UpdateCardAccount(graphene.Mutation):
    card_account = graphene.Field(CardAccountType)

    class Arguments:
        card_account_id = graphene.Int(required=True)
        due_customer = graphene.Int()
        bank_name = graphene.String()
        branch_name = graphene.String()
        account_name = graphene.String()
        account_number = graphene.String()
        current_balance = graphene.Int()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # getting specific CardAccount
        card_account = CardAccount.objects.get(
            id=kwargs.get('card_account_id'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        card_account.due_customer = due_customer_id
        card_account.bank_name = kwargs.get('bank_name')
        card_account.branch_name = kwargs.get('branch_name')
        card_account.account_name = kwargs.get('account_name')
        card_account.account_number = kwargs.get('account_number')
        card_account.current_balance = kwargs.get('current_balance')

        card_account.save()

        return UpdateCardAccount(card_account=card_account)


class CreateBankAccount(graphene.Mutation):
    bank_account = graphene.Field(BankAccountType)

    class Arguments:
        due_customer = graphene.Int(required=True)
        bank_name = graphene.String(required=True)
        branch_name = graphene.String(required=True)
        account_name = graphene.String(required=True)
        account_number = graphene.String(required=True)
        current_balance = graphene.Int(required=True)
        account_type = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        bank_account = BankAccount(
            user=user,
            pump=user.pump,
            due_customer=due_customer_id,
            bank_name=kwargs.get('bank_name'),
            branch_name=kwargs.get('branch_name'),
            account_name=kwargs.get('account_name'),
            account_number=kwargs.get('account_number'),
            current_balance=kwargs.get('current_balance'),
            account_type=kwargs.get('account_type')
        )

        bank_account.save()

        return CreateBankAccount(bank_account=bank_account)


class UpdateBankAccount(graphene.Mutation):
    bank_account = graphene.Field(BankAccountType)

    class Arguments:
        bank_account_id = graphene.Int(required=True)
        due_customer = graphene.Int()
        bank_name = graphene.String()
        branch_name = graphene.String()
        account_name = graphene.String()
        account_number = graphene.String()
        current_balance = graphene.Int()
        account_type = graphene.String()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        due_customer_id = DueCustomer.objects.get(
            id=kwargs.get('due_customer'))

        # getting specific BankAccount
        bank_account = BankAccount.objects.get(
            id=kwargs.get('bank_account_id'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to add customer.')

        bank_account.due_customer = due_customer_id
        bank_account.bank_name = kwargs.get('bank_name')
        bank_account.branch_name = kwargs.get('branch_name')
        bank_account.account_name = kwargs.get('account_name')
        bank_account.account_number = kwargs.get('account_number')
        bank_account.current_balance = kwargs.get('current_balance')
        bank_account.account_type = kwargs.get('account_type')

        bank_account.save()

        return UpdateBankAccount(bank_account=bank_account)


class Mutation(graphene.ObjectType):
    create_due_customer = CreateDueCustomer.Field()
    create_due_customer_vehicle = CreateDueCustomerVehicle.Field()
    create_digital_wallet = CreateDigitalWallet.Field()
    create_card_account = CreateCardAccount.Field()
    create_bank_account = CreateBankAccount.Field()

    update_due_customer = UpdateDueCustomer.Field()
    update_due_customer_vehicle = UpdateDueCustomerVehicle.Field()
    update_digital_wallet = UpdateDigitalWallet.Field()
    update_card_account = UpdateCardAccount.Field()
    update_bank_account = UpdateBankAccount.Field()

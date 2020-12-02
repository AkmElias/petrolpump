import graphene
import graphql_jwt

import account.schema
import products.schema
import machines.schema
import dailylog.schema
import customers.schema
import expenditures.schema


class Query(account.schema.Query, products.schema.Query, machines.schema.Query, dailylog.schema.Query, customers.schema.Query, expenditures.schema.Query, graphene.ObjectType):
    pass


class Mutation(account.schema.Mutation, products.schema.Mutation, machines.schema.Mutation, dailylog.schema.Mutation, customers.schema.Mutation, expenditures.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

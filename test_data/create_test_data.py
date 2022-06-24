import import_users_new
import import_customers
import import_publications
import create_cognito_user

import_users_new.run('./users/testdata_user.json')
import_customers.run()
import_users_new.run('./users/test_users_new.json')
import_publications.run()

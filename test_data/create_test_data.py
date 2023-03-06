import import_users_new
import import_customers
import import_publications

import_users_new.run('./users/testdata_user.json', True)
import_customers.run()
import_users_new.run('./users/test_users_new.json', False)
import_publications.run()

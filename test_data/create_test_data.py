import import_users_new
import import_customers
import delete_publications

import_users_new.run('./users/testdata_user.json', True)
# import_customers.run()
import_users_new.run('./users/test_users_new.json', False)
delete_publications.run()

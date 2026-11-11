import import_users_new
import import_customers
import delete_publications
import create_external_clients
import create_approval_policies

import_users_new.run('./users/testdata_user.json', True)
# import_customers.run()
import_users_new.run('./users/test_users_new.json', False)
delete_publications.run()
create_external_clients.run('./clients/external_clients.json')
create_approval_policies.run('./approvals/identifier_policies.json')

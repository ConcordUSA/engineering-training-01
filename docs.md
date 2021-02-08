## Add An Internal User Admin
---
0. Ensure that the potential admin/admins go through the standard Create Account
flow that any external user would.
​
1. Sign into https://firebase.google.com/ with a gmail admin account.
​
2. Click the "Go to console" button in the top right.
​
3. Click the relevant project under the "Your Firebase projects" section.
​
4. Click the "Cloud Firestore" tab in the left side navigation.
​
5. Ensure you are on the "Data" tab of the Cloud Firestore section.
​
6. In the first column click the "users" collection.
​
7. In the second column find and select the ID of the user you want to promote
to Admin. If you dont know the ID of the user you can use the filter accessed at
the top of the column. Hit the filter icon and a menu will open. In the "filter by
field" enter a field you know the value of such as email. Then select a condition 
in the "select condition" field, such as "equal to". Then if the value is a string,
like in the case of email. Enter the email of the user you would like to target.
​
8. In the third column hover over the "isAdmin" field and select the edit pencil
that is revealed.
​
9. Under the value section click the drop down and select "true".
​
10. Repeat steps 7 - 9 for all users you want to promote to
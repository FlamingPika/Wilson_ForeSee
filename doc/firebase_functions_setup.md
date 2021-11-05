## Firebase functions setup

**This is for first time setup, I don't know if it is also useful for an existing project.**

(if you are using proxy: run `set https_proxy=http://xx.xx.xx.xx:xx` or `export https_proxy=http://xx.xx.xx.xx:xx`.)

1. Install firebase-cli for your computer: `npm install -g firebase-tools`.
2. Then you can type `firebase -V` to check the version, mine is 9.16.0.
3. Run `firebase login` login to your google account with our project.
4. Run `firebase init`.

`Which Firebase features do you want to set up for this directory? `

5. Select `Functions` only. (If you also select `FireStore`, it will save the security rule locally, maybe you can edit it and push to firebase?? not tested.)

`Please select an option:`

6. Select `Use an existing project`, and select our project.

`What language would you like to use to write Cloud Functions?`

7. Select `JavaScript`.

`Do you want to use ESLint to catch probable bugs and enforce style?`

8. I selected `N`. (If you selected yes, it will check you code style when deploying function to firebase. The styles are very strict.)

9. Choose install all dependencies.

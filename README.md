# PERN STACK BOOKS PROJECT 📔

Welcome to my project, this time i decided to do create an app based on books cause during high school i developed a passion for reading that i keep with me

## Main Technologies:

1. Vite as web bundler
2. React as main library(or framework depending of point ov view 🧐)
3. Tailwind as css framework
4. Redux as framework for global state
5. Express as backend framework
6. PostgreSql as database

## Project details:

- I am still studying typescript so for some types i escaped error with `any`, but i had been as specific as possible in important points of code like API calls, redux slices and global state
- I integrate axios as baseQuery in redux rtkQuery to have more information and so also more control over async operations of the application
- I adopted a features based architecture folders and is the first time so I am not sure if I fully understand it and applied always in the right way

## Before starting project

1. Start installing dependencies frontend and backend with `npm install`
2. Create an `Aiven` account going to `https://aiven.io/`
3. After logging in, create a new **PostgreSql** service:

- Chose cloud provider or leave default one
- Select region or leave default one
- Select plan for cloud (I chose the free one)
- Wait a couple of minutes to make it create the service

4. After cloud is ready go on page of service created and copy the `Service URI`, and download the `CA certificate` that we will need for SSL connection
5. Now we will use the `Service URI` from a .env file and the `CA certificate` from a .pem file to connect to our database
6. For `pgAdmin`, we will need to copy and paste: Host, Database name, Port, User and Password in the fields required after right clicking register and server in a server group in the ui interface, or already existent or new one if we prefer have a group for localhost and one for cloud saved one

## PROJECT IS READY TO RUN 🎉

If there has been any problems you can write me and i will update set-up list if i miss a step

**If there are points that can be improved or you have any advice about how to make things differently i would be glad to listen different opinions and learn new thing**

## Thanks for visiting PERN\_\_BOOK ✌🏼

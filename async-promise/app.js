function getUsers(callback) {
    setTimeout(() => {
        
        const users = [
            {name: 'rogelio', years:22 },
            {name: 'luis', years:30}
        ];

        callback(users);
    }, 2000);
    
}

function getUsersWithPromise(callback) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        
            const users = [
                {name: 'rogelio', years:22 },
                {name: 'luis', years:30}
            ];
    
            resolve(users);
        }, 2000);
    });


    return promise;
}

function getInfo(name, callback) {
    
    setTimeout(() => {
        let error = null;
        const saludo = "Hola" +  name + ", Como estas?";

        if (name === "rogelio") {
            error = new Error("Esta es la persona");
        }

        callback(saludo, error);
    }, 5000);
}

function getInfoWithPromise(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = null;
            const saludo = "Hola" +  name + ", Como estas?";
    
            if (name === "rogelio") {
                reject( new Error("Esta es la persona"));
            } else {
                resolve(users);
            }
        }, 5000);
    });
}

getUsers((users) => {
    for (let i = 0; i < URLSearchParams.length; i++) {
        getInfo(users[i].name,(saludo, error) => {
            if (error !== null) {
                console.log("Existe un error: ", error);
            } else {
                console.log(saludo);
            }
        });
    }
});

getUsersWithPromise()
    .then((users) => {
        let newPromises = [];
        for (let i = 0; i < users.length; i++) {
            newPromises.push(getInfoWithPromise(users[i].name));
        }

        return Promise.all(newPromises);
    })
    .then((info) => {
        console.log(info);
    })
    .catch((error) => {
        console.log("Error en la promesa: ",error);
    });

    async function main() {
        let users = await getUsersWithPromise();

        for (let i = 0; i < users.length; i++) {
            try {
                let saludo = await getInfoWithPromise(users[i].name);
            } catch (error) {
                console.log(error)
            }
        }
    }


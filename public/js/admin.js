//Eliminar un usuario

const deleteUserButtons = document.querySelectorAll(".deleteUser");

const deleteUser = async (uid) => {
    try {
        const response = await fetch(`/admin/${uid}`, {
            method: "DELETE",
        });

        console.log(response)

        const result = await response.json();

        if (response.status === 200) {
            alert("Usuario eliminado");
            location.reload();
        }
    } catch (error) {
        console.log(error);

    }
};

deleteUserButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const uid = btn.value;
        console.log(uid);
        await deleteUser(uid);
    });
});

//Cambiar el rol de un usuario

const changeRoleButtons = document.querySelectorAll(".changeUserRole");

const changeUserRole = async (uid, newRole) => {
    try {
        const response = await fetch(`/admin/${uid}/role`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
        });

        console.log(response)

        if (response.status === 200) {
            alert("Rol de usuario cambiado exitosamente");
            location.reload();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.log(error);

    }
};

changeRoleButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {

        const uid = btn.value;
        const newRole = prompt("Ingrese el nuevo rol del usuario");
        if (newRole) {
            await changeUserRole(uid, newRole);
        }
        console.log(uid, newRole);

    });
});













/*const deleteBtnsUser = document.getElementById("deleteUser");
const uid = deleteBtnsUser.value;

const deleteUser = async (uid) => {
    try {
        const response = await fetch(`/admin/${uid}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (response.status === 200) {
            alert("Usuario eliminado");
        } /*else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.log(error);

    }
};

deleteBtnsUser.addEventListener("click", (e) => {
    console.log(e.target.value)
    deleteUser(uid);
})*/



// Cambiar el role del usuario

/*const btnChangeRole = document.getElementById("changeRole");
const updateRole = btnChangeRole.value;

const changeUserRole = async (uid, newRole) => {
    try {
        const response = await fetch(`/admin/${uid}/role`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
        });

        if (response.status === 200) {
            alert("Rol de usuario cambiado exitosamente");
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.log(error);

    }
};

btnChangeRole.addEventListener("click", () => {
    const newRole = prompt("Ingrese el nuevo rol del usuario");
    if (newRole) {
        changeUserRole(uid, newRole);
    }
});

*/
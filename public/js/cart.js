
const deleteBtns = Array.from(

    document.querySelectorAll("#cart__product--deleteBtn")

);

const deleteProduct = async (cid, pid) => {
    try {
        const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (response.status === 200) {
            location.reload();
        }

    } catch (error) {

        console.log(error)

    }
};

const cid = document.getElementById("purchase__btn").value;

deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
        const pid = btn.value;
        console.log({ cid, pid });
        deleteProduct(cid, pid);
    });
});

//const purchaseBtn = document.getElementById("purchase__btn");

/*purchaseBtn.addEventListener("click", (e) => {
    const cid = e.target.value;
    purchaseCart(cid);
});


const purchaseCart = async (cid) => {

    try {

        const response = await fetch(`/cart/${cid}/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response)
        const result = await response.json();

        //Revisar el code

        if (response.status === 200) {
            alert(`Compra realizada con exito ${result.result.code} `);
            location.reload();
        }


    } catch (error) {
        console.log(error)


    }
} */


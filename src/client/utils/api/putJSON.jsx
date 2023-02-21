
export async function putJSON(url, object) {
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(object),
    });

    return res.status;
}
function getSuspender(promise: Promise<string>) {
    let status = "pending";
    let response: string;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res
        },
        (err) => {
            status = "error";
            response = err;
        }
    );

    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }

    }
    return { read };
}

export function useFetchCsrf(url: string) {
    const promise = fetch(url)
        .then(response => response.text())
        .then(token => token)

    return getSuspender(promise);
}
import { IParams } from "../../../types/Params";

function getSuspender(promise: Promise<IParams[]>) {
    let status = "pending";
    let response: IParams[];

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

export function useFetchParams(url: string) {
    const promise = fetch(url)
        .then((response) => response.json())
        .then((params) => params)

    return getSuspender(promise);
}
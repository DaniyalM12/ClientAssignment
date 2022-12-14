export class BaseResponse<T> {
    private success: boolean = false;
    // @ts-ignore
    private error: Error = null;
    // @ts-ignore
    private data: T = null;


    successExec(data: T) {
        this.success = true;
        this.data = data;
    }

    errorExec(error: Error) {
        this.success = false;
        this.error = error;
    }

    disposeResponse() {
        return {
            success: this.success,
            error: (this.error) ? this.error.message : null,
            data: this.data,
        };
    }
}

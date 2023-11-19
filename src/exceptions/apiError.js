class ApiError extends Error{
    status;
    errors;
    constructor(status,message,errors=[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static Unauthorized (){
        return new ApiError(401, 'Client unauthorized');
    }

    static BadRequest (message, errors = []){
        console.log('In BR');
        return new ApiError(400, message, errors);
    }
}

export default ApiError
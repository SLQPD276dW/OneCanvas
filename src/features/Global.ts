export function CheckNullOrUndefined<T>(variable: T): asserts variable is NonNullable<T>{
    if (variable === undefined || variable === null) {
        throw new Error(
            `variableは${variable}です。`
        );
    }
}

export const repository_link = "https://github.com/SLQPD276dW/OneCanvas";
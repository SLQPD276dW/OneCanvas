export function AssertIsDefined<T>(val: T): asserts val is NonNullable<T>{
    if (val === undefined || val === null) {
        throw new Error(
            `Expected 'val' to be defined, but received ${val}`
        );
    }
}

export const repository_link = "https://react-bootstrap.github.io/components/navs/";
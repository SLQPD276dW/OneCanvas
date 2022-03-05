/**
 * Global.ts
 */

/**
 * variableからnullableを除去する関数
 * @param variable nullableを除去する変数
 */
 export function CheckNullOrUndefined<T>(variable: T): asserts variable is NonNullable<T>{
    if (variable === undefined || variable === null) {
        throw new Error(
            `variableは${variable}です。`
        );
    }
}

// ソースコードが置いてあるGithubリポジトリへのリンク
export const repository_link = "https://github.com/SLQPD276dW/OneCanvas";
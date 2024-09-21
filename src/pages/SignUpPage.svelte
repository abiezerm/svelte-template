<script lang="ts">
    import { _ } from 'svelte-i18n';
    import FormInput from '../lib/FormInput.svelte';
    import { signup } from "../api/apiCalls.svelte";

    let apiCall = $state<AxiosPromise | null>(null);

    let state = $state({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        posting: false,
        showSuccess: false,
        errors: []
    });

    let disabled = $derived(
        state.password.length === 0 
        || state.passwordRepeat.length === 0 
        || state.password !== state.passwordRepeat
    );

    let passwordMismatch = $derived(state.password !== state.passwordRepeat);

    const onInputChange = (event: Event) => {
        const {id, value} = event.target as HTMLInputElement;
        state[id] = value;
        state.errors[id] = "";
    };

    const submit = async (event:MouseEvent) => {
        event.preventDefault();
        state.posting = true;
        const {username, email, password} = state;
        
        try {
            await signup({username, email, password});
            state.username = '';
            state.email = '';
            state.password = '';
            state.passwordRepeat = '';
            state.showSuccess = true;
        } catch(error) {
            if(error.response.status === 400) {
                console.log('Errors', error.response.data.validationErrors);
                state.errors = error.response.data.validationErrors;
            }
            console.log(error.response);
        } finally {
            state.posting = false;
        }
    };

</script>

<div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2" data-testid="signup-page">
    <form class="card mt-5">
        <div class="card-header">
            <h1 class="text-center">{$_("signUp")}</h1>
        </div>
        <div class="card-body">
            <FormInput 
                id="username" 
                label={$_("username")} 
                on:input={onInputChange}
                help={state.errors.username} 
            />
            
            <FormInput 
                id="email" 
                label={$_("email")} 
                on:input={onInputChange}
                help={state.errors.email} 
            />

            <FormInput 
                id="password" 
                label={$_("password")}  
                type="password"
                on:input={onInputChange}
                help={state.errors.password} 
            />

            <FormInput 
                id="passwordRepeat" 
                label={$_("passwordRepeat")} 
                type="password"
                on:input={onInputChange}
                help={passwordMismatch ? $_("passwordMismatchValidation") : ""} 
            />
            
            <div class="text-center">
                <button class="btn btn-primary" disabled={disabled || state.posting} onclick={submit}>
                    {#await apiCall}
                        <span class="spinner-border spinner-border-sm" role="status"></span>
                    {/await}
                    {$_("signUp")}
                </button>
            </div>
        </div>
    </form> 
    {#if state.showSuccess}
        <div class="alert alert-success">Please check your email to activate your account</div>
    {/if}
</div>




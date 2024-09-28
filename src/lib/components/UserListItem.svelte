<script lang="ts">
    import { Link } from "svelte-routing";
    import profileImage from '../../assets/profile.png';

    export let user;

    let userImage = user.image ? user.image : profileImage;
    
</script>

<Link class="list-group-item list-group-item-action" to={`/user/${user.id}`}>
    <img src={userImage}  class="rounded-circle shadow-sm"  alt="profile" width="30" height="30" />
    <span>{user.username}</span>
</Link>
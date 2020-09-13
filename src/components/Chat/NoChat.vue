<template>
    <!-- .no-message -->
    <div class="chat">
        <div class="chat-body">
            <div class="no-message-container">
                <div class="row mb-5">
                    <div class="col-md-4 offset-md-4">
                        <img
                            src="/dist/media/svg/undraw_empty_xct9.svg"
                            class="img-fluid no-drag"
                            alt="image"
                        />
                    </div>
                </div>
                <p class="lead">Select a chat to read messages</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.no-message-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100%;
}
</style>
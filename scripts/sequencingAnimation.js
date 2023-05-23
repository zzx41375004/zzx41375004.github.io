const aliceTumbling = [{transform: 'rotate(0) scale(1)'}, {transform: 'rotate(360deg) scale(0)'}];

const aliceTiming = {
    duration: 2000, iterations: 1, fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

function usePromiseChain() {
    function returnPromise(person) {
        return person.animate(aliceTumbling, aliceTiming).finished;
    }

    returnPromise(alice1)
        .then(() => returnPromise(alice2))
        .then(() => returnPromise(alice3))
        .then(() => console.log("end!"));
}


function callback_hell() {
    function foo(person, callback) {
        ani = person.animate(aliceTumbling, aliceTiming).finished;
        ani.then(() => {
            callback();
        });
    }

    foo(alice1, () => {
        foo(alice2, () => {
            foo(alice3, () => {
                console.log("callback hell!");
            })
        })
    })
}

function useAsync() {
    async function _useAsync() {
        await alice1.animate(aliceTumbling, aliceTiming).finished;
        await alice2.animate(aliceTumbling, aliceTiming).finished;
        await alice3.animate(aliceTumbling, aliceTiming).finished;
    }

    useAsync().then(() => console.log("useAsync!"));
}

usePromiseChain();
function test(arr)
{
    const map = {}
    arr.forEach(i =>{
        map[i.id] = {
            item:i,
            from:{},
            to:{}
        }
    })
    for(i in map)
    {
        // console.log(i,map[i].item.deps)
        for(j of map[i].item.deps)
        {
            map[i].from[j] = map[j]
            map[j].to[i] = map[i]
        }
        // map[i].from.push()
    }
    // console.log(map)
    let root = arr.filter(e => Object.keys(map[e.id].from).length === 0)
    // console.log(root)
    ans = []
    while(root.length != 0){
        for(let i in root){
            ans.push(root[i])
            const to = map[root[i].id].to
            Object.keys(to).forEach(k => {
                delete map[k].from[root[i].id]
            } )
            // delete map[root[i].id].to[root[i].id].from[i]
            // console.log(map[root[i].id].to.indexOf(root[i]))
            delete map[root[i].id]
            delete root[i]
        }
        const newRoot = []
        Object.keys(map).forEach(e =>{
            if(Object.keys(map[e].from).length === 0){
                newRoot.push(map[e].item)
            }
        })
        root = newRoot

    }
    console.log(ans)
}
test([
    {
        id:4,
        deps:[1]
    },
    {
        id:3,
        deps:[2]
    },
    {
        id:2,
        deps:[]
    },
    {
        id:1,
        deps:[2,3]
    }
])
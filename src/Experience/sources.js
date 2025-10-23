export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg',
        ]
    },
    {
        name: 'perlinTexture',
        type: 'texture',
        path: 'textures/noise/perlin.png'
    },
    {
        name: 'bushTextureAlpha',
        type: 'texture',
        path: 'textures/bush/bushAlpha.png'
    },
    {
    
        name: 'bushTextureMatcap',
        type: 'texture',
        path: 'textures/bush/leavesMatcap.png'

    },
    {
        name: 'cozyplace',
        type: 'gltfModel',
        path: 'models/Place/cozyplace.glb'
    },
    {
    
        name: 'dancemodel',
        type: 'gltfModel',
        path: 'models/Place/dancing.glb'
    }
]
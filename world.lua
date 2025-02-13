--# name: world2 - UeJHj7pNGKcZW_tlpNdmVAJGM-nmyT4ziSzhkhUkRCk


RealityInfo = {
    Dimensions = 2,
    Name = 'ExampleReality',
    ['Render-With'] = '2D-Tile-0',
}

RealityParameters = {
    ['2D-Tile-0'] = {
        Version = 0,
        Spawn = { 5, 7 },
        -- This is a tileset themed to Llama Land main island
        Tileset = {
            Type = 'Fixed',
            Format = 'PNG',
            TxId = 'h5Bo-Th9DWeYytRK156RctbPceREK53eFzwTiKi0pnE', -- TxId of the tileset in PNG format
        },
        -- This is a tilemap of sample small island
        Tilemap = {
            Type = 'Fixed',
            Format = 'TMJ',
            TxId = 'koH7Xcao-lLr1aXKX4mrcovf37OWPlHW76rPQEwCMMA', -- TxId of the tilemap in TMJ format
            -- Since we are already setting the spawn in the middle, we don't need this
            -- Offset = { -10, -10 },
        },
    },
}

RealityEntitiesStatic = {
    ['MyNpc'] = {
        Type = 'Avatar',
        Position = { 10, 10 },
        Metadata = {
            DisplayName = 'My NPC',
            SpriteTxId = 'B7pFqngSEw-dZ6X9mA-4ubVyjOkD3NAAeERgu6XzCws',
            -- SpriteTxId = '0WFjH89wzK8XAA1aLPzBBEUQ1uKpQe9Oz_pj8x1Wxpc',
        },
    }
}

--#endregion

return print("Loaded Reality Template")

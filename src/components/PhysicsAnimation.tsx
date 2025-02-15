"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface PhysicsAnimationProps {
    items: Array<{ type: "text" | "image"; content: string; baseWidth: number }>
}

const PhysicsAnimation: React.FC<PhysicsAnimationProps> = ({ items }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024)
        }

        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)

        return () => {
            window.removeEventListener("resize", checkScreenSize)
        }
    }, [])

    useEffect(() => {
        if (!isDesktop || !containerRef.current) return

        let cleanup: (() => void) | undefined

        const initPhysics = async () => {
            const Matter = await import("matter-js")

            const engine = Matter.Engine.create({
                gravity: { x: 0, y: 1, scale: 0.0008 },
            })

            const containerRect = containerRef.current!.getBoundingClientRect()
            const render = Matter.Render.create({
                element: containerRef.current!,
                engine: engine,
                options: {
                    width: containerRect.width,
                    height: containerRect.height,
                    wireframes: false,
                    background: "transparent",
                    pixelRatio: window.devicePixelRatio,
                },
            })

            const getSizeConfig = () => ({
                baseScale: 0.7,
                fontSize: 18,
                chamferRadius: 12,
                imageScale: 0.75,
                density: 0.0015,
                friction: 0.85,
                restitution: 0.18,
                heightMultiplier: 0.9,
            })

            const getItemDimensions = (baseWidth: number) => {
                const config = getSizeConfig()
                return {
                    width: Math.round(baseWidth * config.baseScale),
                    height: Math.round(50 * config.heightMultiplier),
                    fontSize: config.fontSize,
                    chamferRadius: config.chamferRadius,
                    imageScale: config.imageScale,
                    density: config.density,
                    friction: config.friction,
                    restitution: config.restitution,
                }
            }

            const createPillCanvas = (item: any) => {
                const scale = window.devicePixelRatio || 1
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")
                if (!ctx) return canvas

                const dims = getItemDimensions(item.baseWidth)
                canvas.width = dims.width * scale
                canvas.height = dims.height * scale
                ctx.scale(scale, scale)

                ctx.fillStyle = "#1d1d1d"
                const radius = dims.height / 2
                ctx.beginPath()
                ctx.moveTo(radius, 0)
                ctx.lineTo(dims.width - radius, 0)
                ctx.arcTo(dims.width, 0, dims.width, radius, radius)
                ctx.arcTo(dims.width, dims.height, dims.width - radius, dims.height, radius)
                ctx.lineTo(radius, dims.height)
                ctx.arcTo(0, dims.height, 0, dims.height - radius, radius)
                ctx.arcTo(0, 0, radius, 0, radius)
                ctx.closePath()
                ctx.fill()

                if (item.type === "text") {
                    ctx.fillStyle = "#fff"
                    ctx.textAlign = "center"
                    ctx.textBaseline = "middle"
                    ctx.font = `bold ${dims.fontSize}px Darker Grotesque`
                    ctx.fillText(item.content, dims.width / 2, dims.height / 2)
                }

                return canvas
            }

            const bodies = items.map((item, index) => {
                const canvas = createPillCanvas(item)
                const dims = getItemDimensions(item.baseWidth)

                const body = Matter.Bodies.rectangle(
                    (index + 1) * (containerRect.width / (items.length + 1)),
                    -200 + Math.random() * 20,
                    dims.width,
                    dims.height,
                    {
                        friction: dims.friction,
                        restitution: dims.restitution,
                        density: dims.density,
                        chamfer: { radius: dims.chamferRadius },
                        render: {
                            sprite: {
                                texture: canvas.toDataURL(),
                                xScale: 1,
                                yScale: 1,
                            },
                        },
                    },
                )

                if (item.type === "image") {
                    const img = new Image()
                    img.crossOrigin = "anonymous"
                    img.src = item.content
                    img.onload = () => {
                        const canvas = createPillCanvas(item)
                        const ctx = canvas.getContext("2d")
                        if (!ctx) return

                        const aspectRatio = img.width / img.height
                        let drawWidth = dims.width * dims.imageScale
                        let drawHeight = drawWidth / aspectRatio

                        if (drawHeight > dims.height * dims.imageScale) {
                            drawHeight = dims.height * dims.imageScale
                            drawWidth = drawHeight * aspectRatio
                        }

                        const x = (dims.width - drawWidth) / 2
                        const y = (dims.height - drawHeight) / 2

                        ctx.drawImage(img, x, y, drawWidth, drawHeight)
                        if (body.render.sprite) {
                            body.render.sprite.texture = canvas.toDataURL()
                        }
                    }
                }

                return body
            })

            const walls = [
                Matter.Bodies.rectangle(containerRect.width / 2, containerRect.height + 30, containerRect.width, 60, {
                    isStatic: true,
                }),
                Matter.Bodies.rectangle(0, containerRect.height / 2, 60, containerRect.height, { isStatic: true }),
                Matter.Bodies.rectangle(containerRect.width, containerRect.height / 2, 60, containerRect.height, {
                    isStatic: true,
                }),
            ]

            Matter.World.add(engine.world, [...bodies, ...walls])

            const mouse = Matter.Mouse.create(render.canvas)
            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false },
                },
            })

            Matter.World.add(engine.world, mouseConstraint)

            const runner = Matter.Runner.create()
            Matter.Runner.run(runner, engine)
            Matter.Render.run(render)

            cleanup = () => {
                Matter.Render.stop(render)
                Matter.Runner.stop(runner)
                Matter.World.clear(engine.world, false)
                Matter.Engine.clear(engine)
                render.canvas.remove()
            }
        }

        initPhysics()

        return () => {
            if (cleanup) cleanup()
        }
    }, [isDesktop, items])

    return (
        <div
            ref={containerRef}
            className="physics-container absolute z-0 w-full h-full"
            style={{ display: isDesktop ? "block" : "none" }}
        ></div>
    )
}

export default PhysicsAnimation


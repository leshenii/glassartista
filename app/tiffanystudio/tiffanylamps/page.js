'use client'

import {Card, Image} from "@heroui/react";

export default function TiffanyLampsPage() {


    return (
        <div>

            <Card className="h-full p-3">
                <div className="flex flex-col text-xl">
                    <div className="flex flex-row p-3 gap-8">
                        <Image
                            alt="Magnólia Tiffany lámpa"
                            src="/magnolia-1.jpg"
                            isBlurred
                            isZoomed
                            width={900}>
                        </Image>
                        <div className="flex flex-col gap-8">
                            <h1>Magnólia Tiffany Lámpa</h1>
                            <p>A „Magnólia” Tiffany lámpa egy igazi műalkotás, amely a Tiffany lámpák egyik legnagyobb
                                és
                                leglátványosabb darabja. Louis Comfort Tiffany eredeti tervei alapján készült, és a
                                magnólia
                                virágainak gyönyörű mintázatát jeleníti meg. A tiffany lámpa átmérője lenyűgöző, 71
                                cm-es
                                (28
                                inch), ami már önmagában is tekintélyes méretet kölcsönöz ennek a műremeknek.</p>
                        </div>
                    </div>

                    <div className="flex flex-row p-3 gap-8">
                        <Image
                            alt="Magnólia Tiffany lámpa"
                            src="/magnolia-2.jpg"
                            isBlurred
                            isZoomed
                            radius="lg"
                            width={900}>
                        </Image>
                        <p>Az általam készített lámpa különlegessége, hogy a virágszirmok egy részét a Drapery Tiffany
                            üvegből alkottam meg, amely drapériaszerűen hullámzó felületével adja vissza a virágok
                            természetes mozgását. A lámpa összesen 1260 darab, gondosan kiválogatott Youghiogheny,
                            Uroboros
                            és Bullseye Tiffany üvegből készült, így a fény és a színek játéka minden részletben
                            megfigyelhető.</p>
                    </div>


                </div>
            </Card>

        </div>
    );
}
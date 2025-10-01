'use client'


import {FaAddressCard, FaFacebookSquare, FaPhoneAlt} from "react-icons/fa";
import {RiMailFill} from "react-icons/ri";
import {AiFillInstagram} from "react-icons/ai";
import {TbExternalLink} from "react-icons/tb";
import {Form, Input, Button, Textarea, Spinner} from "@heroui/react";
import {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactPage() {

    const [submitted, setSubmitted] = useState(null);
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [valid, setValid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateFields = (f) => {
        return (
            f.name.trim().length > 0 &&
            emailRegex.test(f.email) &&
            f.message.trim().length > 0
        );
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
        setValid(validateFields(fields));
    };

    const handleChange = (e) => {
        const newFields = { ...fields, [e.target.name]: e.target.value };
        setFields(newFields);
        setValid(validateFields(newFields));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                setSubmitted(data);
            } else {
                alert('Something went wrong: ' + result.error);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    function onChange(value) {
        console.log("Captcha value:", value);
    }

    return (
        <div className="flex flex-row gap-24 w-screen items-center justify-center h-screen-minus-navbar-desktop pb-16 pl-16">
            <div className="flex flex-col gap-6 w-min justify-center items-start">
                <h2 className="text-5xl allura-regular underline decoration-2 underline-offset-8">Nyíri Eszter</h2>
                <div className="flex flex-row items-center gap-2 ">
                    <FaPhoneAlt size={25}/>
                    +36-70/360-0950
                </div>
                <div className="flex flex-row items-center gap-2 ">
                    <RiMailFill size={30}/>
                    m.tiffanystudio@gmail.com <TbExternalLink size={15}/>
                </div>
                <div className="flex flex-row items-center gap-2 ">
                    <AiFillInstagram size={30}/>
                    magnolia_tiffanystudio <TbExternalLink size={15}/>
                </div>
                <div className="flex flex-row items-center gap-2 ">
                    <FaFacebookSquare size={30}/>
                    Magnólia Tiffanystúdió <TbExternalLink size={15}/>
                </div>
            </div>
            <div className="flex flex-col w-1/2">
                <h2 className="font-semibold text-neutral-400 pb-5">Vedd fel velem a kapcsolatot!</h2>
                <Form className="w-full" onSubmit={onSubmit} validationBehavior="aria">
                    <div className="flex flex-row gap-6 w-full">
                        <Input
                            isRequired
                            label="Név"
                            labelPlacement="outside"
                            name="name"
                            type="text"
                            variant="bordered"
                            fullWidth={true}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={fields.name}
                            validate={(value) => {
                                if (touched.name && value.length === 0) {
                                    return "Kérlek add meg a neved!";
                                }
                                return null;
                            }}
                        />
                        <Input
                            label="Telefonszám"
                            labelPlacement="outside"
                            name="tel"
                            type="tel"
                            variant="bordered"
                        />
                    </div>
                    <Input
                        isRequired
                        label="E-mail címed"
                        labelPlacement="outside"
                        name="email"
                        type="email"
                        variant="bordered"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={fields.email}
                        validate={(value) => {
                            if (touched.email && !emailRegex.test(value)) {
                                return "Kérlek érvényes e-mail címet adj meg!";
                            }
                            return null;
                        }}
                    />
                    <Input
                        label="Tárgy"
                        labelPlacement="outside"
                        name="text"
                        type="text"
                        variant="bordered"
                    />
                    <Textarea
                        className="py-5"
                        isRequired
                        label="Üzenet"
                        labelPlacement="outside"
                        name="message"
                        type="text"
                        rows={5}
                        minRows={5}
                        maxRows={20}
                        variant="bordered"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={fields.message}
                        validate={(value) => {
                            if (touched.message && value.length === 0) {
                                return "Kérlek írd meg az üzeneted!";
                            }
                            return null;
                        }}
                    />
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={onChange}
                        size="normal"
                        style={{ display: "inline-block" }}
                        theme="dark"
                    />
                    <Button
                        type="submit"
                        variant="bordered"
                        isDisabled={!valid || loading}
                        startContent={loading ? <Spinner size="sm" color="primary" /> : undefined}
                    >
                        Küldés
                    </Button>
                    {submitted && (
                        <div className="text-small text-default-500">
                            Köszönöm, {submitted.name}! Az üzenetedet megkaptam, hamarosan felveszem veled a kapcsolatot.
                        </div>
                    )}
                </Form>
            </div>
        </div>
    )
}
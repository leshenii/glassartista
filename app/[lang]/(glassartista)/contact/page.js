'use client'


import {FaAddressCard, FaFacebookSquare, FaPhoneAlt} from "react-icons/fa";
import {RiMailFill} from "react-icons/ri";
import {AiFillInstagram} from "react-icons/ai";
import {TbExternalLink} from "react-icons/tb";
import {Form, Input, Button, Textarea, Spinner, Skeleton} from "@heroui/react";
import React, {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

const LOCALES = ['hu', 'de', 'en'];
const DEFAULT_LOCALE = 'en';

const DICT = {
    hu: {
        pageHeading: "Vedd fel velem a kapcsolatot!",
        name: "Név",
        tel: "Telefonszám",
        email: "E-mail címed",
        subject: "Tárgy",
        message: "Üzenet",
        send: "Küldés",
        requiredName: "Kérlek add meg a neved!",
        requiredEmail: "Kérlek érvényes e-mail címet adj meg!",
        requiredMessage: "Kérlek írd meg az üzeneted!",
        thanks: (n) => `Köszönöm, ${n}! Az üzenetedet megkaptam, hamarosan felveszem veled a kapcsolatot.`,
        contactNameHeader: "Nyíri Eszter"
    },
    de: {
        pageHeading: "Kontaktieren Sie mich!",
        name: "Name",
        tel: "Telefonnummer",
        email: "Ihre E-Mail",
        subject: "Betreff",
        message: "Nachricht",
        send: "Absenden",
        requiredName: "Bitte gib deinen Namen an!",
        requiredEmail: "Bitte geben Sie eine gültige E-Mail-Adresse an!",
        requiredMessage: "Bitte schreiben Sie Ihre Nachricht!",
        thanks: (n) => `Danke, ${n}! Ich habe Ihre Nachricht erhalten und melde mich bald bei Ihnen.`,
        contactNameHeader: "Eszter Nyíri"
    },
    en: {
        pageHeading: "Contact me!",
        name: "Name",
        tel: "Phone",
        email: "Your email",
        subject: "Subject",
        message: "Message",
        send: "Send",
        requiredName: "Please enter your name!",
        requiredEmail: "Please provide a valid email address!",
        requiredMessage: "Please write your message!",
        thanks: (n) => `Thank you, ${n}! I received your message and will contact you soon.`,
        contactNameHeader: "Eszter Nyíri"
    }
};

export default function GlassArtistaContactPage({ params }) {

    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;
    const L = DICT[lang];

    const [submitted, setSubmitted] = useState(null);
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [valid, setValid] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateFields = (f) => {
        return (
            f.name.trim().length > 0 &&
            emailRegex.test(f.email) &&
            f.message.trim().length > 0
        );
    };

    const handleBlur = (e) => {
        setTouched({...touched, [e.target.name]: true});
        setValid(validateFields(fields));
    };

    const handleChange = (e) => {
        const newFields = {...fields, [e.target.name]: e.target.value};
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
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                setSubmitted(data);
            } else {
                alert((result.error && typeof result.error === 'string') ? result.error : 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    function onRecaptchaChange(value) {
        setRecaptchaToken(value);
    }

    function handleRecaptchaLoad() {
        setRecaptchaLoaded(true);
    }

    return (
        <div
            className="flex flex-col overflow-visible lg:flex-row gap-10 lg:gap-24 w-screen items-center justify-center lg:h-screen-minus-navbar-desktop mt-4 lg:mt-0 lg:pl-16">
            <div className="flex flex-col gap-6 h-full w-min justify-center items-start">
                <h2 className="text-5xl allura-regular underline decoration-2 underline-offset-8 mx-auto">{L.contactNameHeader}</h2>
                <div className="flex flex-row items-center gap-2 select-all ">
                    <FaPhoneAlt size={25}/>
                    +36-70/360-0950
                </div>
                <div className="flex flex-row items-center gap-2 select-all ">
                    <RiMailFill size={30}/>
                    m.tiffanystudio@gmail.com
                </div>
                <Link href="https://www.instagram.com/magnolia_tiffanystudio/" target="_blank">
                    <div className="flex flex-row items-center gap-2 ">
                        <AiFillInstagram size={30}/>
                        magnolia_tiffanystudio
                        <TbExternalLink size={16}/>
                    </div>
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=100054201323550#" target="_blank">
                    <div className="flex flex-row items-center gap-2 ">
                        <FaFacebookSquare size={30}/>
                        Magnólia Tiffanystúdió
                        <TbExternalLink size={16}/>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col w-10/12 pb-24 lg:pb-0 lg:w-1/2">
                <h2 className="font-semibold text-neutral-400 lg:pb-5">{L.pageHeading}</h2>
                <Form className="w-full" onSubmit={onSubmit} validationBehavior="aria">
                    <div className="flex flex-row gap-6 w-full">
                        <Input
                            isRequired
                            label={L.name}
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
                                    return L.requiredName;
                                }
                                return null;
                            }}
                        />
                        <Input
                            label={L.tel}
                            labelPlacement="outside"
                            name="tel"
                            type="tel"
                            variant="bordered"
                        />
                    </div>
                    <Input
                        isRequired
                        label={L.email}
                        labelPlacement="outside"
                        name="email"
                        type="email"
                        variant="bordered"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={fields.email}
                        validate={(value) => {
                            if (touched.email && !emailRegex.test(value)) {
                                return L.requiredEmail;
                            }
                            return null;
                        }}
                    />
                    <Input
                        label={L.subject}
                        labelPlacement="outside"
                        name="text"
                        type="text"
                        variant="bordered"
                    />
                    <Textarea
                        className="py-5"
                        isRequired
                        label={L.message}
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
                                return L.requiredMessage;
                            }
                            return null;
                        }}
                    />
                    {!recaptchaLoaded && (
                        <Skeleton className="rounded-sm">
                            <div className="h-[70px] w-[304px] rounded-sm bg-default-300"/>
                        </Skeleton>
                    )}
                    <div style={{colorScheme: "light"}}>
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={onRecaptchaChange}
                            asyncScriptOnLoad={handleRecaptchaLoad}
                            theme="dark"
                            hl={lang}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="bordered"
                        isDisabled={!valid || !recaptchaToken || loading}
                        startContent={loading ? <Spinner size="sm" color="primary"/> : undefined}
                    >
                        {L.send}
                    </Button>
                    {submitted && (
                        <div className="text-small text-default-500">
                            {L.thanks(submitted.name)}
                        </div>
                    )}
                </Form>
            </div>
        </div>
    )
}
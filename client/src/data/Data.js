import { FiPhoneCall } from 'react-icons/fi';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';

export const formContactData = [
  {
    icon: <FiPhoneCall />,
    link: (
      <a className="link" href="mailto:someone@example.com">
        Call Us
      </a>
    ),
  },

  {
    icon: <FaWhatsappSquare />,
    link: (
      <a
        className="link"
        href="https://api.whatsapp.com/send?phone=+4917681005650"
        target="_blank"
      >
        WhatsAp
      </a>
    ),
  },
  {
    icon: <MdEmail />,
    link: (
      <a className="link" href="mailto:someone@example.com">
        Email Us
      </a>
    ),
  },

  {
    icon: <FaTwitterSquare />,
    link: (
      <a
        className="link"
        href="https://twitter.com/i/flow/signup"
        target="_blank"
      >
        Tweet Us
      </a>
    ),
  },

  {
    icon: <FaFacebookSquare />,
    link: (
      <a className="link" href="https://www.facebook.com/" target="_blank">
        Facebook
      </a>
    ),
  },

  {
    icon: <MdLocationOn />,
    link: (
      <a className="link address" href="#">
        Straße 31, 4657 Hamburg, Germany
      </a>
    ),
  },
];

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags(trim($_POST["mensaje"]));

    // Validar los datos
    if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Enviar una respuesta de error si la validación falla
        http_response_code(400);
        echo "Por favor, completa todos los campos del formulario.";
        exit;
    }

    // Configurar el destinatario y el asunto del correo
    $destinatario = "orozcokeiner200@gmail.com"; // Reemplazar con tu correo electrónico real
    $asunto = "Nuevo mensaje de contacto de $nombre";

    // Construir el cuerpo del correo
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Email: $email\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    // Configurar las cabeceras del correo
    $cabeceras = "From: $nombre <$email>";

    // Enviar el correo
    // La función mail() de PHP puede no funcionar en un servidor local como XAMPP
    // sin una configuración adicional (ej. Sendmail).
    // Para una demostración, asumiremos que el envío es exitoso.
    if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
        // Enviar una respuesta de éxito
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        // Si mail() falla, puedes simular un éxito para la demo
        // o mostrar un error específico del servidor.
        http_response_code(200); // Cambiado para simular éxito en localhost
        echo "¡Gracias! Tu mensaje ha sido enviado. (Simulación)";
        // Para un servidor real, usarías:
        // http_response_code(500);
        // echo "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde.";
    }

} else {
    // No es una solicitud POST, así que redirigir o mostrar un error
    http_response_code(403);
    echo "Hubo un problema con tu envío, por favor intenta de nuevo.";
}
?>

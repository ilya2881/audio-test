<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userAnswers = $_POST["answers"]; // Массив ответов
    $correctAnswers = ["1" => "b", "2" => "a"]; // Правильные ответы
    
    // Подсчёт правильных ответов
    $score = 0;
    foreach ($userAnswers as $question => $answer) {
        if ($answer === $correctAnswers[$question]) {
            $score++;
        }
    }
    
    // Можно сохранить в БД или файл
    file_put_contents("results.txt", "Пользователь набрал: $score из " . count($correctAnswers));
    
    echo "Ваш результат: $score из " . count($correctAnswers);
}
?>